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
		$('#nav').addClass('dark');
	},
	
	contractUniverse:function() {
		BigBang.contractUniverse();
		$('#nav').removeClass('dark');
		if(AboutPage.isVisible) AboutPage.hidePage();
		if(PortfolioPage.isVisible) PortfolioPage.hidePage();
	},
}

$(document).ready(function() {
	
	$('#about_link').click(function(e) {
		Page.linkClicked(e);
		if(PortfolioPage.isVisible) PortfolioPage.hidePage();
		AboutPage.showPage();		
	});
	
	$('#portfolio_link').click(function(e) {
		Page.linkClicked(e);
		if(AboutPage.isVisible) AboutPage.hidePage();
		
		if(PortfolioPage.selectedProject) { 
			PortfolioPage.hideProject();
			return;
		}
		
		PortfolioPage.showPage();
	});
	
	$('.portfolio_link').hover(function() {
		PortfolioPage.previewProject(this);
	}, function() {
		//var project = $(this).attr('project');
		//$('#'+project+'_grayscale').removeClass('partial');
		//$('#portfolio_title, .portfolio_link').removeClass('obscured');
	});
	
	$('.portfolio_link').click(function() {
		PortfolioPage.showProject(this);
	});
	
	$('#logodark, #logolight').click(function() {
		Page.contractUniverse();
	});
	
	
	setTimeout(function() {
		Page.bigBang();
	}, 500);
});

AboutPage = {
	isVisible: false,
	
	showPage: function() {
		$('#about_slide').show(function() {
			$(this).addClass('visible');
		});
		AboutPage.isVisible = true;
	},
	
	hidePage: function() {
		$('#about_slide').removeClass('visible');
		$('#about_slide').delay(3000).hide();
	}
};

PortfolioPage = {
	selectedProject: false,
	isVisible: false,
	
	showPage: function() {
		$('#portfolio_slide').show(function() {
			$(this).addClass('visible');
			$('#theater').show();
		});
		PortfolioPage.isVisible = true;
	},
	
	previewProject:function(button) {
		var project = $(button).attr('project');
		$('#'+project+'_grayscale').addClass('partial');
		$('#portfolio_title, .portfolio_link').addClass('obscured');
		$(button).removeClass('obscured');
	},
	
	showProject: function(button) {
		if(PortfolioPage.selectedProject == project) return;
		
		var project = $(button).attr('project');
		$('#'+project+'_color').addClass('visible');
		$('#portfolio_title, .portfolio_link').addClass('hidden');
		$(button).removeClass('hidden');
		$(button).addClass('title');
		$('#'+project+'_info').show(function() {
			$(this).addClass('visible');
		});
		$('#nav').removeClass('dark');
		PortfolioPage.selectedProject = project;
	},
	
	hideProject: function() {
		$('#portfolio_title, .portfolio_link').removeClass('hidden').removeClass('title');
		$('.project_info').removeClass('visible');
		$('.banner').removeClass('visible').removeClass('partial');
		PortfolioPage.selectedProject = false;
	},
	
	hidePage: function() {
		PortfolioPage.hideProject();
		$('#portfolio_slide').removeClass('visible');
		$('#portfolio_slide').delay(3000).hide();
		//$('#theater').hide();
	}
};