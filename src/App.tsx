import { AppProviders } from "@presentation/app/AppProviders";
import { AppRouter } from "@presentation/app/AppRouter";

export function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
