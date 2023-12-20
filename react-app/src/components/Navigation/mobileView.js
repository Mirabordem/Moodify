const toggleSideMenu = () => {
  const sideMenu = document.querySelector('.side-menu');
  const sideToggle = document.querySelector('.sideToggleAlex');
  const musicPlayer = document.querySelector('.musicPlayer');

  console.log('sideMenu is ', sideMenu);
  if (sideMenu) {
      const currentWidth = sideMenu.style.width;
      const currentDisplay = sideToggle.style.display;

      sideMenu.style.width = currentWidth === '60%' ? '0%' : '60%';
      sideToggle.style.display = currentDisplay === 'inline-block' ? 'none' : 'inline-block';

      if (sideMenu.style.width === '60%' && sideToggle.style.display === 'inline-block') {
          musicPlayer.style.display = 'none';
      } else {
          musicPlayer.style.display = 'block';
      }
  }
};

export default toggleSideMenu;
