/*
 *	jQuery Sliding Columns Menu 0.1
 *	Demo's and doc :
 *	www.dosne.net (Soon)
 *
 *	Licensed under the MIT license.
 *	http://www.opensource.org/licenses/mit-license.php
 */
(function ($){
	
	var options = {
		version: '0.1',
		width: 150,
		backButtonLabel: 'Back',
		classNamePrefix: 'jd-scm-'
	};
	
	$.fn.jdScMenu = function ( userOptions )
	{
		var activeUL = null;
		var me = $(this);
		
		if( userOptions !== undefined )
		{
			options = $.extend(options, userOptions);
		}
		
		me.css(
		{
			width : options.width + 'px',
			height : options.width + 'px',
			position : 'relative',
			border: '1px solid black'
		});
		
		// Create a wrapper
		
		me.wrap('<div id="'+options.classNamePrefix+'wrapper" />');
		var wrapper = $('#'+options.classNamePrefix+'wrapper');
		wrapper.append('<div id="'+options.classNamePrefix+'content" />');
		wrapper.css('width', options.width);
		var content = $('#'+options.classNamePrefix+'content');
		content.css(
		{
			position : 'absolute',
			top: '0px',
			left: -1 * options.width + 'px'
		});
		
		// Finding UL for positionning
		var cpt = 0;
		me
		.attr('id', 'slide0')
		.data({id:cpt})
		.find('li:has(ul)')
		.each(function()
		{
			cpt++;
			$(this)
				.addClass(''+options.classNamePrefix+'has-child')
				.attr('id', ''+options.classNamePrefix+'li'+cpt)
				.data({id:cpt});
			$(this).children('ul')
				.attr('id', ''+options.classNamePrefix+'slide'+cpt)
				.data({id:cpt});
		});
		wrapper.find('ul').each(function()
		{
			var slide = $('<div id="'+options.classNamePrefix+'slide'+$(this).data('id')+'" />');
			content.append(slide);
			$(this).children('li').clone(true).appendTo(slide);
			slide
				.addClass(''+options.classNamePrefix+'slide')
				.data({id: $(this).data('id')})
				.css('width', options.width)
				.css('left', options.width*2)
				.hide()
				.find('ul').remove();
		});
		
		
		// Add Back button
		$('.'+options.classNamePrefix+'slide:not(:first)').prepend('<li class="'+options.classNamePrefix+'back">'+options.backButtonLabel+'</li>');
		$('.'+options.classNamePrefix+'back').click(function(e)
		{
			var slideWillHide = $(this).parent();
			var slideWillShow = $('#'+options.classNamePrefix+'li'+$(this).parent().data('id')).parent();
			//console.log(slideWillShow);
			slideWillShow
				.show()
				.css('left', 0)
				.animate({left: options.width});
			slideWillHide
				.animate({left:options.width*2}, {complete:function(){  }});
			wrapper
				.animate({height: slideWillShow.height()});
			e.stopPropagation();
		});
		content.find('li.'+options.classNamePrefix+'has-child').click(function(e)
		{
			var slideWillHide = $(this).parent();
			var slideWillShow = $('#'+options.classNamePrefix+'slide'+$(this).data('id'));
			slideWillShow
				.show()
				.css('left', options.width*2)
				.animate({left: options.width});
			slideWillHide
				.animate({left:0}, {complete:function(){  }});
			wrapper
				.animate({height: slideWillShow.height()});
			e.stopPropagation();
		});
		me.remove();
		$('#'+options.classNamePrefix+'slide0')
			.css('left', options.width)
			.show();
		
		wrapper
			.animate({height: $('#'+options.classNamePrefix+'slide0').height()});
	};
})(jQuery);