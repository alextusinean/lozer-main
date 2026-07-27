import type { AuthProvider } from '@refinedev/core';
import { axiosInstance } from '@refinedev/nestjsx-crud';
import { Buffer } from 'buffer';

export function createAuthProvider(apiUrl: string): AuthProvider {
  return {
    async login({ id, password }) {
      if (id && password) {
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Basic ${Buffer.from(`${id}:${password}`).toString('base64')}`;
        const identity = await this?.getIdentity?.();
        if (identity) {
          return {
            success: true,
            redirectTo: '/',
          };
        }
      }
  
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: 'Invalid id or password',
        },
      };
    },
    async logout() {
      axiosInstance.defaults.headers.common['Authorization'] = undefined;
      return {
        success: true,
        redirectTo: '/login',
      };
    },
    async check() {
      const identity = await this?.getIdentity?.();
      if (identity)
        return { authenticated: true };
  
      return {
        authenticated: false,
        redirectTo: '/login',
      };
    },
    async getPermissions() {
      return [];
    },
    async getIdentity() {
      try {
        const response = await axiosInstance.get(apiUrl + '/users/me');
        const roles = [];
        if (response.data.role == 'ghost' || response.data.role == 'cashier')
          roles.push(response.data.role);

        if (response.data.role == 'supervisor' || response.data.role == 'admin') {
          roles.push('supervisor');
          roles.push('cashier');
          if (response.data.role == 'admin')
            roles.push('admin');
        }

        return { ...response.data, roles };
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async onError(error) {
      console.error(error);
      return { error };
    },
  };
}
