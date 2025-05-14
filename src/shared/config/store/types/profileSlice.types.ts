export enum ProfileRoles {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface Profile {
  id: string;
  email: string;
  name: string;
  country: string;
  birthDate: string;
  tagName: string;
  role: ProfileRoles;
  enabled: boolean;
}

export interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}

export interface ProfilesState {
  profiles: Profile[];
  isLoading: boolean;
  error: string | null;
}