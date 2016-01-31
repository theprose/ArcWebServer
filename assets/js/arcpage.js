Page = {
	
	//expand and contract the universe when link is clicked
	linkClicked:function(e) {
		e.preventDefault();
		Page.expandUniverse();
	},
	
	bigBang: function() {
		BigBang.explode();
		$('a, #logolight').addClass('visible');
	},
	
	expandUniverse:function() {
		BigBang.expandUniverse();
		$('a').addClass('dark');
		$('#logodark').addClass('visible');
	},
	
	contractUniverse:function() {
		BigBang.contractUniverse();
		$('a').removeClass('dark');
		$('#logodark').removeClass('visible');
		$('.slide').removeClass('visible');
	},
}

$(document).ready(function() {
	
	$('#about_link').click(function(e) {
		Page.linkClicked(e);
		$('#about_slide').show(function() {
			$(this).addClass('visible');
		});
	});
	
	$('#portfolio_link').click(function(e) {
		Page.linkClicked(e);
		$('#portfolio_slide').show(function() {
			$(this).addClass('visible');
			$('#theater').show();
		});
	});
	
	$('.portfolio_link').hover(function() {
		var project = $(this).attr('project');
		$('#'+project+'_grayscale').addClass('partial');
		$('#portfolio_title, .portfolio_link').addClass('obscured');
		$(this).removeClass('obscured');
	}, function() {
		//var project = $(this).attr('project');
		//$('#'+project+'_grayscale').removeClass('partial');
		//$('#portfolio_title, .portfolio_link').removeClass('obscured');
	});
	
	$('.portfolio_link').click(function() {
		var project = $(this).attr('project');
		$('#'+project+'_color').addClass('visible');
		$('#portfolio_title, .portfolio_link').addClass('hidden');
		$(this).removeClass('hidden');
		$(this).addClass('title');
		$('#'+project+'_info').show(function() {
			$(this).addClass('visible');
		});
	});
	
	$('#logodark').click(function() {
		Page.contractUniverse();
	});
	
	
	setTimeout(function() {
		Page.bigBang();
	}, 500);
});