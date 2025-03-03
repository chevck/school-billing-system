import { Outlet } from "react-router-dom";

export function Layout() {
  console.log("window", window.location);
  const path = window.location.pathname;
  console.log({ path });
  return (
    <div className='layout-view container-fluid'>
      <div className='row'>
        <div className='col-2'>
          <div className='user-container'>
            <div className='icon'>
              <i className='bi bi-buildings'></i>
            </div>
            <div className=''>
              <h5>The Crystal School</h5>
              <h6>Free Plan</h6>
            </div>
          </div>
          <div className='menu'>
            <section>
              <h6>Main Menu</h6>
            </section>
            <ul>
              <a
                className={path === "/dashboard" ? "active" : ""}
                href='/dashboard'
              >
                <i className='bi bi-speedometer2'></i>
                <p>Dashboard</p>
              </a>
              <a className={path === "/bills" ? "active" : ""} href='/bills'>
                <i className='bi bi-receipt'></i>
                <p>Bills</p>
              </a>
              <a
                className={path === "/students" ? "active" : ""}
                href='/students'
              >
                <i className='bi bi-speedometer2'></i>
                <p>Students</p>
              </a>
              <a
                className={path === "/guardians" ? "active" : ""}
                href='/guardians'
              >
                <i className='bi bi-speedometer2'></i>
                <p>Guardians</p>
              </a>
            </ul>
          </div>
        </div>
        <div className='col-10'>
          <div className='content-container'>
            <div className='content-header'>
              <input className='form-control' placeholder='Search' />
              <div className='control-panel'>
                <i className='bi bi-bell notify-icon'></i>
                <div className='divider' />
                <button>
                  Export <i className='bi bi-box-arrow-in-up-right'></i>
                </button>
              </div>
            </div>
            <div className='content-body'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
