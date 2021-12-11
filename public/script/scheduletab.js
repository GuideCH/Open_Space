const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')


  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.tabTarget)
      tabContents.forEach(tabContent => {
        tabContent.classList.remove('home_tab_active')
      })
      tabs.forEach(tab => {
        tab.classList.remove('home_tab_active')
      })
      tab.classList.add('home_tab_active')
      target.classList.add('home_tab_active')
    })
  })
