import NavBar from "./NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen gap-20 ">
     <NavBar />
      <main className="w-3/4 mx-auto mb-20 mt-12">
        {children}
      </main>
    </div>
  )
}
