/* Layout vide — exclut la sidebar et la navbar admin pour les pages d'authentification */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
