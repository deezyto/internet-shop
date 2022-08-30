
import Items from './modules/content/items';
import SidebarMenu from './modules/sidebar/sidebar-menu';
import Search from './modules/content/search';
import Style from './modules/content/style';
import Filters from './modules/filters/filters';

window.addEventListener('DOMContentLoaded', () => {
  new Items().render();
  new SidebarMenu({selector: '.category-parent'}).render();
  new Search().render();
  new Style().render();
  new Filters().render();
});