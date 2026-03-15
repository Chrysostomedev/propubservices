import { AdminSidebar } from '../../components/back/AdminSidebar'
import { AdminNavbar }  from '../../components/back/AdminNavbar'

export default function BackLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Sidebar — cachée sur mobile via CSS */}
      <div className="admin-sidebar-wrap">
        <AdminSidebar />
      </div>

      {/* Contenu principal */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminNavbar />
        <main style={{ flex: 1, padding: '28px 24px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-wrap { display: none; }
        }
      `}</style>
    </div>
  )
}
