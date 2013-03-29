'use strict';

fifoApp.factory('status', function($rootScope) {

    $rootScope.setTitle = function(text) {
        $rootScope.title = text
        document.title = text ? text + ' - FiFo' : 'FiFo Cloud'
    }

    var status = {};

    var updateText = function(status) {
        var txt = []

        $rootScope.status = []
        Object.keys(status).forEach(function(k) {
            var st = status[k],
            msg = {
                percent: (100 * st.current / st.total).toFixed(0),
                current: st.current,
                total: st.total,
                name: k,
                show_progress: typeof st.current == 'number'
            }
            $rootScope.status.push(msg)
        })

    }

    var update = function(type, params) {

        //when total comes, start from scratch
        if (params && params.total)
            params.current = 0;

        if (params && params.add)
            status[type].current += params.add;
        else
            status[type] = params

        /* delete msg if the work is done */
        if (status[type].current && status[type].total && status[type].current >= status[type].total)
            delete status[type]

        updateText(status)
    }

    return {

        /* params: {total: int, add: int} */
        update: update,

        /* Show something for a little time..*/
        info: function(text) {
            Alertify.log.info(text)
        },

        success: function(text) {
            Alertify.log.success(text)
        },

        error: function(text) {
            Alertify.log.error(text)
        },

        prompt: function(text, cb, errCb) {
            Alertify.dialog.prompt(text, function(userInput) {
                if (userInput == '') return;
                cb(userInput);
            }, errCb)
        }
    };
});
