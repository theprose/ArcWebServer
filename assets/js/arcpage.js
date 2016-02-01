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
	
	expandUniverse: function() {
		BigBang.expandUniverse();
		$('#nav').addClass('dark');
	},
	
	contractUniverse: function() {
		BigBang.contractUniverse();
		$('#nav').removeClass('dark');
		if(AboutPage.isVisible) AboutPage.hidePage();
		if(PortfolioPage.isVisible) PortfolioPage.hidePage();
		if(TeamPage.isVisible) TeamPage.hidePage();
	},
	
	resize: function() {
		//var wh = $(window).height();
		/*
$('.slide').each(function() {
			var offset = Math.max(60, Math.max(0, wh - 600) / 2);
			$(this).css('margin-top', offset);
		});
*/
	}
}

$(document).ready(function() {
	
	$('#about_link').click(function(e) {
		Page.linkClicked(e);
		if(PortfolioPage.isVisible) PortfolioPage.hidePage();
		if(TeamPage.isVisible) TeamPage.hidePage();
		
		AboutPage.showPage();		
	});
	
	$('#portfolio_link').click(function(e) {
		Page.linkClicked(e);
		if(AboutPage.isVisible) AboutPage.hidePage();
		if(TeamPage.isVisible) TeamPage.hidePage();
		
		if(PortfolioPage.selectedProject) { 
			PortfolioPage.hideProject();
			return;
		}
		
		PortfolioPage.showPage();
	});
	
	$('#team_link').click(function(e) {
		Page.linkClicked(e);
		if(PortfolioPage.isVisible) PortfolioPage.hidePage();
		if(AboutPage.isVisible) AboutPage.hidePage();
		
		TeamPage.showPage();	
	});
	
	$('.portfolio_link').hover(function() {
		PortfolioPage.previewProject(this);
	}, function() {
		//var project = $(this).attr('project');
		//$('#'+project+'_grayscale').removeClass('partial');
		//$('#portfolio_title, .portfolio_link').removeClass('obscured');
	});
	
	$('.portfolio_link').click(function(e) {
		e.preventDefault();
		PortfolioPage.showProject(this);
	});
	
	$('#logodark, #logolight').click(function() {
		Page.contractUniverse();
	});
	
	Page.resize();
	$(window).resize(function() {
		Page.resize();
	});
	
	
	setTimeout(function() {
		Page.bigBang();
	}, 1000);
});

AboutPage = {
	isVisible: false,
	
	showPage: function() {
		$('#about_slide').show(function() {
			$(this).addClass('visible');
		});
		this.isVisible = true;
	},
	
	hidePage: function() {
		$('#about_slide').removeClass('visible');
		$('#about_slide').delay(3000).hide();
		this.isVisible = false;
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
		this.isVisible = true;
	},
	
	previewProject:function(button) {
		if(this.selectedProject) return;
		
		var project = $(button).attr('project');
		$('.banner').removeClass('partial');
		$('#'+project+'_grayscale').addClass('partial');
		$('#portfolio_title, .portfolio_link').addClass('obscured');
		$(button).removeClass('obscured');
	},
	
	showProject: function(button) {
		if(this.selectedProject == project) return;
		
		var project = $(button).attr('project');
		$('#'+project+'_color').addClass('visible');
		$('#portfolio_title, .portfolio_link').addClass('hidden');
		$(button).removeClass('hidden');
		$(button).addClass('title');
		$('#'+project+'_info').show(function() {
			$(this).addClass('visible');
		});
		$('#nav').removeClass('dark');
		this.selectedProject = project;

	},
	
	hideProject: function() {
		$('#portfolio_title, .portfolio_link').removeClass('hidden').removeClass('title').removeClass('obscured');
		$('.project_info').removeClass('visible').delay(1000).hide();
		$('.banner').removeClass('visible').removeClass('partial');
		this.selectedProject = false;
	},
	
	hidePage: function() {
		PortfolioPage.hideProject();
		$('#portfolio_slide').removeClass('visible');
		$('#portfolio_slide').delay(3000).hide();
		this.isVisible = false;
		//$('#theater').hide();
	}
};

TeamPage = {
	isVisible: false, 
	
	showPage: function() {
		$('#team_slide').show(function() {
			$(this).addClass('visible');
			$('#theater').show();
		});
		$('#email').attr('href', 'mailto:hello@arcreactor.com');
		$('#email').text('hello@arcreactor.com');
		this.isVisible = true;
	},
	
	hidePage: function() {
		$('#team_slide').removeClass('visible');
		$('#team_slide').delay(3000).hide();
		this.isVisible = false;
	}
}