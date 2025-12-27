import { create } from 'zustand';
import { GameState, Consultant, Project, Desk } from '@/types';
import { generateConsultant, generateProject } from '@/lib/generator';
import {
  calculateMatchScore,
  calculateProgressPerTick,
  calculateRevenuePerTick,
  calculateEnergyDecay,
} from '@/lib/workSimulation';

interface GameStore extends GameState {
  consultants: Consultant[];
  projects: Project[];
  desks: Desk[];
  
  // Core actions
  tick: () => void;
  setPaused: (paused: boolean) => void;
  addMoney: (amount: number) => void;
  setRevenue: (amount: number) => void;
  reset: () => void;
  
  // Entity management
  addConsultant: (consultant: Consultant) => void;
  removeConsultant: (id: string) => void;
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  updateConsultantEnergy: (id: string, energy: number) => void;
  
  // Desk assignments
  assignConsultantToDesk: (consultantId: string, deskId: string) => void;
  assignProjectToDesk: (projectId: string, deskId: string) => void;
  removeConsultantFromDesk: (deskId: string) => void;
  removeProjectFromDesk: (deskId: string) => void;
  
  // Work simulation
  processWorkTick: () => void;
  
  // Initialization
  initializeGame: () => void;
}

const createInitialDesks = (count: number): Desk[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `desk-${i + 1}`,
    consultantId: null,
    projectId: null,
  }));
};

const initialState: GameState & {
  consultants: Consultant[];
  projects: Project[];
  desks: Desk[];
} = {
  money: 1000,
  revenue: 0,
  ticks: 0,
  isPlaying: false,
  consultants: [],
  projects: [],
  desks: createInitialDesks(2), // Start with 2 desks (Garage tier)
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  
  tick: () =>
    set((state) => ({
      ticks: state.ticks + 1,
      money: state.money + state.revenue,
    })),
    
  setPaused: (paused) => set({ isPlaying: !paused }),
  
  addMoney: (amount) => set((state) => ({ money: state.money + amount })),
  
  setRevenue: (amount) => set({ revenue: amount }),
  
  reset: () => set({ ...initialState, desks: createInitialDesks(2) }),
  
  // Entity management
  addConsultant: (consultant) =>
    set((state) => ({ consultants: [...state.consultants, consultant] })),
    
  removeConsultant: (id) =>
    set((state) => ({
      consultants: state.consultants.filter((c) => c.id !== id),
    })),
    
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
    
  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),
    
  updateConsultantEnergy: (id, energy) =>
    set((state) => ({
      consultants: state.consultants.map((c) =>
        c.id === id ? { ...c, energy: Math.max(0, Math.min(c.maxEnergy, energy)) } : c
      ),
    })),
  
  // Desk assignments
  assignConsultantToDesk: (consultantId, deskId) =>
    set((state) => {
      // Remove consultant from any existing desk first
      const updatedDesks = state.desks.map((desk) => ({
        ...desk,
        consultantId: desk.consultantId === consultantId ? null : desk.consultantId,
      }));
      
      // Assign to new desk
      return {
        desks: updatedDesks.map((desk) =>
          desk.id === deskId ? { ...desk, consultantId } : desk
        ),
      };
    }),
    
  assignProjectToDesk: (projectId, deskId) =>
    set((state) => {
      // Remove project from any existing desk first
      const updatedDesks = state.desks.map((desk) => ({
        ...desk,
        projectId: desk.projectId === projectId ? null : desk.projectId,
      }));
      
      // Assign to new desk
      return {
        desks: updatedDesks.map((desk) =>
          desk.id === deskId ? { ...desk, projectId } : desk
        ),
      };
    }),
    
  removeConsultantFromDesk: (deskId) =>
    set((state) => ({
      desks: state.desks.map((desk) =>
        desk.id === deskId ? { ...desk, consultantId: null } : desk
      ),
    })),
    
  removeProjectFromDesk: (deskId) =>
    set((state) => ({
      desks: state.desks.map((desk) =>
        desk.id === deskId ? { ...desk, projectId: null } : desk
      ),
    })),
  
  // Work simulation - runs each tick
  processWorkTick: () => {
    const state = get();
    let totalRevenue = 0;
    const completedProjectIds: string[] = [];
    const updatedProjects = [...state.projects];
    const updatedConsultants = [...state.consultants];
    
    // Process each desk with both consultant and project
    state.desks.forEach((desk) => {
      if (!desk.consultantId || !desk.projectId) return;
      
      const consultant = updatedConsultants.find((c) => c.id === desk.consultantId);
      const projectIndex = updatedProjects.findIndex((p) => p.id === desk.projectId);
      
      if (!consultant || projectIndex === -1) return;
      
      const project = updatedProjects[projectIndex];
      
      // Skip if consultant is burned out
      if (consultant.energy <= 0) return;
      
      // Calculate work
      const matchScore = calculateMatchScore(consultant, project);
      const progressGain = calculateProgressPerTick(matchScore);
      const revenue = calculateRevenuePerTick(project, matchScore);
      const energyLoss = calculateEnergyDecay(matchScore);
      
      // Update project progress
      const newProgress = Math.min(100, project.progress + progressGain);
      updatedProjects[projectIndex] = { ...project, progress: newProgress };
      
      // Update consultant energy
      const consultantIndex = updatedConsultants.findIndex((c) => c.id === consultant.id);
      updatedConsultants[consultantIndex] = {
        ...consultant,
        energy: Math.max(0, consultant.energy - energyLoss),
      };
      
      // Add revenue
      totalRevenue += revenue;
      
      // Check for completion
      if (newProgress >= 100) {
        completedProjectIds.push(project.id);
      }
    });
    
    // Clear completed projects from desks
    const updatedDesks = state.desks.map((desk) =>
      completedProjectIds.includes(desk.projectId || '')
        ? { ...desk, projectId: null }
        : desk
    );
    
    // Remove completed projects and add completion bonus
    const remainingProjects = updatedProjects.filter(
      (p) => !completedProjectIds.includes(p.id)
    );
    
    // Completion bonus
    const completionBonus = completedProjectIds.reduce((sum, id) => {
      const project = state.projects.find((p) => p.id === id);
      return sum + (project?.budget || 0);
    }, 0);
    
    set({
      projects: remainingProjects,
      consultants: updatedConsultants,
      desks: updatedDesks,
      money: state.money + totalRevenue + completionBonus,
      revenue: totalRevenue,
    });
  },
  
  // Initialize game with starter entities
  initializeGame: () => {
    const state = get();
    
    // Only initialize if empty
    if (state.consultants.length > 0) return;
    
    // Generate starter consultants
    const starterConsultants = [
      generateConsultant(1),
      generateConsultant(1),
      generateConsultant(2),
    ];
    
    // Generate starter projects
    const starterProjects = [
      generateProject(1),
      generateProject(1),
    ];
    
    set({
      consultants: starterConsultants,
      projects: starterProjects,
    });
  },
}));
