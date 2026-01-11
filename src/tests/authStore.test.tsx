import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../stores/authStore';

describe('Auth Store', () => {
  beforeEach(() => {
    useAuthStore.persist.clearStorage();
    useAuthStore.getState().logout();
  });

  it('should not be authenticated initially', () => {
    const { isAuthenticated } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
  });

  it('should login and set authenticated', () => {
    const { login } = useAuthStore.getState();
    login('token123', {
        email: 'test@example.com',
        id: 0,
        firstname: '',
        lastname: ''
    });
    const { isAuthenticated, token, user } = useAuthStore.getState();
    expect(isAuthenticated).toBe(true);
    expect(token).toBe('token123');
    expect(user).not.toBeNull();
    expect(user?.email).toBe('test@example.com');
  });

  it('should logout and clear state', () => {
    const { login, logout } = useAuthStore.getState();
    login('token123', {
        email: 'test@example.com',
        id: 0,
        firstname: '',
        lastname: ''
    });
    logout();
    const { isAuthenticated, token, user } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(token).toBe(null);
    expect(user).toBe(null);
  });
});