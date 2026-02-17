import { createSignal, Show } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import { Layout } from './components/Layout';
import { Onboarding } from './components/Onboarding';
import { GuardsPage } from './pages/GuardsPage';
import { GuardDetailPage } from './pages/GuardDetailPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { PremiumPage } from './pages/PremiumPage';
import { ProfilePage } from './pages/ProfilePage';
import { LanguagesPage } from './pages/LanguagesPage';
import { SecurityPage } from './pages/SecurityPage';
import { SessionsPage } from './pages/SessionsPage';
import { PasswordPage } from './pages/PasswordPage';
import { TwoFAPage } from './pages/TwoFAPage';
import { AcademyPage } from './pages/AcademyPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpPage } from './pages/HelpPage';
import { getOnboardingDone, setOnboardingDone } from './shared/languages';

export default function App() {
  const [onboardingDone, setOnboardingDoneState] = createSignal(getOnboardingDone());

  const handleOnboardingDone = () => {
    setOnboardingDone();
    setOnboardingDoneState(true);
  };

  return (
    <Show
      when={onboardingDone()}
      fallback={<Onboarding onDone={handleOnboardingDone} />}
    >
      <Router root={Layout}>
        <Route path="/guard/:id" component={GuardDetailPage} />
        <Route path="/order/:id" component={OrderDetailPage} />
        <Route path="/orders" component={OrdersPage} />
        <Route path="/premium" component={PremiumPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/profile/languages" component={LanguagesPage} />
        <Route path="/profile/security" component={SecurityPage} />
        <Route path="/profile/security/sessions" component={SessionsPage} />
        <Route path="/profile/security/password" component={PasswordPage} />
        <Route path="/profile/security/2fa" component={TwoFAPage} />
        <Route path="/profile/academy" component={AcademyPage} />
        <Route path="/profile/favorites" component={FavoritesPage} />
        <Route path="/profile/settings" component={SettingsPage} />
        <Route path="/profile/help" component={HelpPage} />
        <Route path="/" component={GuardsPage} />
      </Router>
    </Show>
  );
}
