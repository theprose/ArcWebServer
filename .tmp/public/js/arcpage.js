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
		$('.slide').removeClass('visible', function() {
			alert('hidden');
		});
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
		$('#portfolio_slide').addClass('visible');
	});
	
	$('#logodark').click(function() {
		Page.contractUniverse();
	});
	
	
	setTimeout(function() {
		Page.bigBang();
	}, 5000);
});