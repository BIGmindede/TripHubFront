import { api } from 'shared/config/store/http';
import { Profile } from '../types/profileSlice.types';

export const profileApi = {
  getProfileById: (id: string) => 
    api.get<Profile>(`/profiles/${id}`),

  getProfilesByIds: (ids: string[]) => 
    api.post<Profile[]>(`/profiles/by_ids`, ids),

  getProfilesByTagName: (tagName: string) => 
    api.get<Profile[]>(`/profiles/by_tagname/${tagName}`),

  getProfilesByName: (name: string) => 
    api.get<Profile[]>(`/profiles/by_name/${name}`),

  getProfilesByEmail: (email: string) => 
    api.get<Profile[]>(`/profiles/by_email/${email}`),

  updateProfile: (profile: Partial<Profile>) => 
    api.put(`/profiles/${profile.id}`, profile),

  deleteProfile: (id: string) => 
    api.delete(`/profiles/${id}`),
};