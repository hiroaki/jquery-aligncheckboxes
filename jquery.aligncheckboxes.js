/*
 * jQuery alignCheckboxes Plug-in
 *
 * Copyright (c) 2011 WATANABE Hiroaki
 *
 * licensed under the MIT:
 *  http://www.opensource.org/licenses/mit-license.php
 *
 * Revision: $Rev$
 * Version: 0.0.2
 *
*/

(function ($) {

    function is_checkbox(t){
        if( $(t).context.nodeName.toUpperCase() == 'INPUT' && $(t).attr('type') == 'checkbox' )
        return true;
        return false;
    }

    $.fn.alignCheckboxes = function (options){

        var defaults = {
            selector: 'input[type=checkbox]'
        };

        if( typeof options == 'string' )
            options = { selector: options };

        var setting = $.extend(defaults,options);
        
        var checkbox_triggers = [];
        
        $(this).each(function (){
            if( is_checkbox(this) )
            checkbox_triggers.push(this);
        });
        
        var is_trigger = function (t){
            for(var i=0, l=checkbox_triggers.length; i < l; ++i )
            if( t === checkbox_triggers[i] )
            return true;
            return false;
        };
        
        var checkboxes = function (){
            return $(setting.selector).filter(function (){ return ! is_trigger(this) });
        };
        
        var get_state_to_set_trigger = function (){
            var cb = checkboxes();
            if( cb.size() == cb.filter(':checked').size() )
            return true;
            return false;
        };

        var reset_trigger = function (){
            var al = get_state_to_set_trigger();
            $.each(checkbox_triggers, function (i,v){
                $(v).attr('checked',al);
            });
        };

        $(this).each(function (){

            var trigger = this;
            
            $(trigger).click(function (){
                var al = is_checkbox(trigger) ? $(trigger).attr('checked') : ( ! get_state_to_set_trigger() );
                checkboxes().each(function (){
                    $(this).attr('checked',al);
                });
                reset_trigger();
            });

            if( 0 < checkbox_triggers.length ){
                checkboxes().each(function (){
                    $(this).click(function (){
                        reset_trigger()
                    });
                });
            }
        });

        return this;
    };

})(jQuery);
