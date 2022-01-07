<template>
  <!-- Navigation -->
  <div
    class="d-flex align-items-center justify-content-between fixed-top navigation"
  >
    <a class="navbar-brand my-0 mr-xs-auto" href="#"
      ><img src="@/assets/images/logo-white.png" alt="AI通訳"
    /></a>
    <button
      class="navbar-toggler collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <nav class="navbar navbar-expand-md">
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav d-flex align-items-center">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="account_dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              @click.prevent="accountMenu = !accountMenu"
              ><img src="@/assets/images/avatar.jpg" class="name"
            /></a>
            <div
              class="dropdown-menu account_dropdown"
              aria-labelledby="account_dropdown"
            >
              <div class="profile">
                <img src="@/assets/images/avatar.jpg" alt="米倉豪志" />
                <p class="name">
                  米倉豪志<span class="email en">goushi@alt.ai</span>
                </p>
              </div>
              <ul class="list">
                <li>
                  <a class="dropdown-item settings" href="#">
                    <span class="ic"
                      ><img src="@/assets/images/ic_settings.svg" alt="Settings"
                    /></span>
                    <span class="en">Settings</span></a
                  >
                </li>
                <li>
                  <a class="dropdown-item logout" href="#">
                    <span class="ic"
                      ><img src="@/assets/images/ic_logout.svg" alt="Logout"
                    /></span>
                    <span class="en">Logout</span></a
                  >
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <!-- /END Navigation -->
</template>

<script>
export default {
  data: () => ({
    accountMenu: false
  })
};
</script>
