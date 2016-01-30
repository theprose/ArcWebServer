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
	},
}

$(document).ready(function() {
	
	$('a').click(function(e) {
		Page.linkClicked(e);
	});
	
	$('#logodark').click(function() {
		Page.contractUniverse();
	});
	
	
	setTimeout(function() {
		Page.bigBang();
	}, 5000);
});