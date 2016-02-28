(function() {
  'use strict';

  angular
    .module('bakkenQuiz')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
