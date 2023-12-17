const toggleSideMenu = () => {
    const sideMenu = document.querySelector('.side-menu');
    const sideToggle=  document.querySelector('.sideToggleAlex');

    console.log('sideMenu is ',sideMenu)
    if (sideMenu) {
      const currentWidth = sideMenu.style.width;
      const currentDisplay = sideToggle.style.display;
      sideMenu.style.width = currentWidth === '60%' ? '0%' : '60%'; // Toggle between 0% and 60%
      sideToggle.style.display = currentDisplay ==='inline-block'? 'none' : 'inline-block'
    }
  };



  export default toggleSideMenu;
