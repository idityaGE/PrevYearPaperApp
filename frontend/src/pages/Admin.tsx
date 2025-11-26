interface AdminLayoutProps {
  children: React.ReactNode;
}

function Admin({ children }: AdminLayoutProps) {
  return (
    <div className="container mx-auto space-y-8 max-w-7xl">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage papers, queries, and users from a single control panel.
        </p>
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}

export default Admin;
