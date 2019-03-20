function asideInfoOpen () {
	$('.aside-info').toggleClass('aside-info_type_open');
};

$('.aside-info .close').click(function() {
	asideInfoOpen ();
});