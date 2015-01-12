<?php
/*
Plugin Name: FancyIndex
Plugin URI: http://
Description: jQuery plugin
Version: 1.0.0
Author: Kolesov Alexey
Author URI: http://
*/
/*  Copyright 2015 Kolesov Alexey  (email: dr.koles@mail.ru)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

function my_scripts_method() {
	wp_register_script( 'koko', plugins_url().'/eskju.jquery.fancyindex/js/koko.js', array('jquery', 'FancyIndex') );
	wp_enqueue_script( 'koko' );
	wp_register_script( 'FancyIndex', plugins_url().'/eskju.jquery.fancyindex/js/eskju.jquery.fancyindex.js', array('jquery') );
    wp_enqueue_script( 'FancyIndex' );
	wp_enqueue_style ( 'eskju.jquery.fancyindex', plugins_url().'/eskju.jquery.fancyindex/css/eskju.jquery.fancyindex.css');
}    
add_action( 'wp_enqueue_scripts', 'my_scripts_method' );
?>