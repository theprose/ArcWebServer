Page = {
	contractDuration: 3000,
	
	//expand and contract the universe when link is clicked
	linkClicked:function(e, button) {
		e.preventDefault();
		$('.navbuttons a').removeClass('selected');
		$(button).addClass('selected');
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
		$('.slide').addClass('slowfade');
		$('.navbuttons a').removeClass('selected');
		if(AboutPage.isVisible) AboutPage.hidePage(true);
		if(PortfolioPage.isVisible) PortfolioPage.hidePage(true);
		if(TeamPage.isVisible) TeamPage.hidePage(true);		
	},
	
	hideSlide: function(slide, slow, callback) {
		$(slide).removeClass('visible');
		if(slow) {
			$(slide).delay(Page.contractDuration).fadeOut(0, function() {
				$(this).removeClass('slowfade');
				if(callback) callback();
			});
		} else {
			$(slide).delay(400).fadeOut(0, function() {
				$(this).removeClass('slowfade');
				if(callback) callback();
			});
		}
	},
	
	switchPage: function(page) {
		if(page.isVisible) return;
		
		if(PortfolioPage.isVisible) { 
			PortfolioPage.hidePage(false, function() {
				page.showPage();
			});
		} else if(TeamPage.isVisible) { 
			TeamPage.hidePage(false, function() {
				page.showPage();
			});
		} else if(AboutPage.isVisible) {
			AboutPage.hidePage(false, function() {
				page.showPage();
			});
		} else { 
			page.showPage();
		}
	},
	
	resize: function() {
		//var wh = $(window).height();
		if($(window).width() < 550) {
			if(!$('#nav').hasClass('mobile')) $('#nav').addClass('mobile');
		} else if($('#nav').hasClass('mobile')) {
			$('#nav').removeClass('mobile');
		}
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
		Page.linkClicked(e, this);
		Page.switchPage(AboutPage);		
	});
	
	$('#portfolio_link').click(function(e) {
		Page.linkClicked(e, this);

		if(PortfolioPage.selectedProject) { 
			PortfolioPage.hideProject();
			return;
		}
		
		Page.switchPage(PortfolioPage);
	});
	
	$('#team_link').click(function(e) {
		Page.linkClicked(e, this);
		Page.switchPage(TeamPage);	
	});
	
	$('.portfolio_link').hover(function() {
		PortfolioPage.previewProject(this);
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
	
	hidePage: function(slow, callback) {
		Page.hideSlide('#about_slide', slow, callback);
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
		$('.project_info').removeClass('visible').delay(1000).fadeOut(10, function() {
			$(this).removeClass('slowfade');
		});
		$('.banner').removeClass('visible').removeClass('partial');
		this.selectedProject = false;
	},
	
	hidePage: function(slow, callback) {
		PortfolioPage.hideProject();
		Page.hideSlide('#portfolio_slide', slow, callback);
		this.isVisible = false;
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
	
	hidePage: function(slow, callback) {
		Page.hideSlide('#team_slide', slow, callback);
		this.isVisible = false;
	}
}