'use strict';

describe('Util: service', function () {

  beforeEach(module('webapp'));

  let $Util;

  beforeEach(inject(function(Util) {
    $Util = Util;
  }));

  it('should return a list of itens to be displayed in the menus', function() {
    let menuList = $Util.getMenuActionItems(),
        expectedResult = [{
              name: 'My Profile',
              icon: 'account_circle',
              sref: 'myprofile',
              show: 'all'
            }, {
              name: 'Public Profile',
              icon: 'public',
              sref: 'publicprofile',
              show: 'profile'
            }, {
              name: 'Help',
              icon: 'help',
              sref: 'help',
              show: 'all'
            }
          ];

    expect(menuList).toEqual(expectedResult);
  });
});
