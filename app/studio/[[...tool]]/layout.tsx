export const metadata = {
  title: "Sanity Studio | Midwife Dumebi",
  description: "Content management for Midwife Dumebi blog",
};

const StudioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default StudioLayout;
