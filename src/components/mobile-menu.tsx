export function MobileMenu({ path }: { path: string }) {
  return (
    <div
      className="offcanvas offcanvas-start mobile-menu-offcanvas"
      tabIndex={-1}
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <div className="user-container">
          <div className="icon">
            <i className="bi bi-buildings"></i>
          </div>
          <div className="">
            <h5>The Crystal School</h5>
            <h6>Free Plan</h6>
          </div>
        </div>
      </div>
      <div className="offcanvas-body">
        <div className="menu">
          <section>
            <h6>Main Menu</h6>
          </section>
          <ul>
            <a
              className={path === "/dashboard" ? "active" : ""}
              href="/dashboard"
            >
              <i className="bi bi-speedometer2"></i>
              <p>Dashboard</p>
            </a>
            <a className={path === "/bills" ? "active" : ""} href="/bills">
              <i className="bi bi-receipt"></i>
              <p>Bills</p>
            </a>
            <a
              className={path === "/students" ? "active" : ""}
              href="/students"
            >
              <i className="bi bi-speedometer2"></i>
              <p>Students</p>
            </a>
            <a
              className={path === "/guardians" ? "active" : ""}
              href="/guardians"
            >
              <i className="bi bi-speedometer2"></i>
              <p>Guardians</p>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}
