
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean> => {
  const router = inject(Router);
  const { authenticated, keycloak, grantedRoles } = authData;

  // L'utilisateur doit être authentifié
  if (!authenticated) {
    await keycloak.login({
      redirectUri: window.location.origin + state.url
    });

    return false;
  }

  // Vérification des rôles requis
  const requiredRoles: string[] = route.data['roles'] ?? [];

  if (requiredRoles.length === 0) {
    return true;
  }

  const hasRole = requiredRoles.some(role =>
    grantedRoles.realmRoles.includes(role)
  );

  if (!hasRole) {
    return router.parseUrl('/forbidden') as any;
  }

  return true;
};

export const canActivateAuthRole =
  createAuthGuard<CanActivateFn>(isAccessAllowed);
