	jQuery.fn.FancyIndex = function( options )
	{
		new FancyIndex( this, options );
	}
	
	FancyIndex = function( selector, options )
	{
		this.init( selector, options );
	}
	
	jQuery.extend( FancyIndex.prototype,
	{
		init : function( selector, options )
		{
			this.selector = jQuery( selector );
			this.items = [];
			this.disabled = false;
			this.lastActivity = 0;
			this.options = jQuery.extend(
			{
				hideWhenInactive: true,
				focusInitally: true,
				focusOnResize: true,
				focusOnScroll: true,
				focusOnHover: true,
				focusTimeout: 1000,
				firstOnly: false,
				forceLastActive: true,
				scrollToDuration: 1000,
				scrollOnClick: true,
				maxPrioritizedItems: 3,
			}, options );
			
			this.loadHierarchy();
			this.bindSelf();
			this.bindScroll();
			this.bindResize();
			this.bindHover();
			this.updateItems();
			
			if( this.options.hideWhenInactive )
			{
				if( this.options.focusInitally )
				{
					this.setActive();
				}
				else
				{
					this.hide();
				}
			}
		},
		
		setActive : function()
		{
			var jQuerythis = this;
			jQuery( "#esKju-fancyIndex" ).removeClass( "inactive" );
			jQuery( "#esKju-fancyIndex" ).animate( { minHeight: 0 }, parseInt( this.options.focusTimeout ), function()
			{
				jQuerythis.hide();
			});
		},
		
		hide: function()
		{
			if( this.options.hideWhenInactive )
			{
				jQuery( "#esKju-fancyIndex" ).addClass( "inactive" );
			}
		},
		
		bindSelf: function()
		{
			var jQuerythis = this;
			
			jQuery( "body" ).bind( "refreshFancyIndex", function( e, options )
			{
				jQuerythis.options = options;
			});
		},
		
		bindScroll : function()
		{
			var jQuerythis = this;
			
			jQuery( window ).scroll( function()
			{
			 	jQuerythis.updateItems();
			 	
			 	if( jQuerythis.options.focusOnScroll )
			 	{
			 		jQuerythis.setActive();
			 	}
			});
		},
		
		bindResize: function()
		{
			var jQuerythis = this;
			
			jQuery( window ).resize( function()
			{
			 	jQuerythis.updateItems();
			 	
			 	if( jQuerythis.options.focusOnResize )
			 	{
			 		jQuerythis.setActive();
			 	}
			});
		},
		
		bindHover: function()
		{
			var jQuerythis = this;
			
			jQuery( "#esKju-fancyIndex" ).hover( function()
			{
			 	if( jQuerythis.options.focusOnHover )
			 	{
			 		jQuerythis.setActive();
			 	}
			});
		},
		
		updateItems : function()
		{
			var jQuerythis = this;
			var windowTop = jQuery( window ).scrollTop()
			var windowHeight = jQuery( window ).height();
			var firstFound = false;
			var focusedItems = parseInt( this.options.maxPrioritizedItems );
			var lastActive = false;
			 	
		 	jQuery.each( jQuerythis.items, function( key, obj )
		 	{
		 		jQuery( obj.obj ).removeClass( "active" );
		 		jQuery( obj.obj ).removeClass( "prioritized" );
	 			
	 			for( i = 1; i <= parseInt( jQuerythis.options.maxPrioritizedItems ); i++ )
	 			{
	 				jQuery( obj.obj ).removeClass( "priority-" + i );
	 			}
	 			
	 			if( windowTop > parseInt( obj.offset.top ) + 50 )
	 			{
 					lastActive = jQuery( obj.obj );
	 			}
		 		
		 		if( ( windowTop <= parseInt( obj.offset.top ) + 50 && windowTop + windowHeight >= parseInt( obj.offset.top ) && ( !jQuerythis.options.firstOnly || !firstFound ) ) && ( parseInt( jQuerythis.options.maxPrioritizedItems ) == 0 || focusedItems > 0 ) )
		 		{
		 			jQuery( obj.obj ).addClass( "active" );
		 			jQuery( obj.obj ).addClass( "prioritized" );
		 			jQuery( obj.obj ).addClass( "priority-" + focusedItems );
		 			firstFound = true;
		 			focusedItems--;
		 		}
		 	});
		 	
		 	if( jQuerythis.options.forceLastActive && jQuery( "#esKju-fancyIndex .active" ).length == 0 )
	 		{
	 			jQuery( lastActive ).addClass( "active" );
	 			jQuery( lastActive ).addClass( "prioritized" );
	 			jQuery( lastActive ).addClass( "priority-" + jQuerythis.options.maxPrioritizedItems );
	 		}
		},
		
		loadHierarchy : function()
		{
			var jQuerythis = this;
			this.items = [];
			
			esKjuFancyIndex = jQuery( "<ul>" ).attr( "id", "esKju-fancyIndex" );
			jQuery( "body" ).append( esKjuFancyIndex );
			
			jQuery( this.selector.find( "h1,h2,h3,h4,h5,h6,h7" ) ).each( function( key, obj )
			{
				var tag = jQuery( obj ).prop( "tagName" ).toLowerCase();
				var content = jQuery( obj ).text();
				var offset = jQuery( obj ).offset();
				var item = jQuery( "<li>" ).addClass( tag ).html( "<div>" + content + "</div>" );
				esKjuFancyIndex.append( item );
				
				jQuerythis.items.push({ 
					offset: offset, 
					obj: item 
				}); 
				
				if( jQuerythis.options.scrollOnClick )
				{
					jQuery( item ).find( "div" ).click( function( )
					{
						offset = jQuery( obj ).offset();
						jQuery( "html, body" ).animate({ scrollTop: offset.top }, parseInt( jQuerythis.options.scrollToDuration ) );
					});
				}
			});
		}
	});