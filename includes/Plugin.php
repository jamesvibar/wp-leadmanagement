<?php
/**
 * WP-Reactivate
 *
 *
 * @package   WP-Reactivate
 * @author    Pangolin
 * @license   GPL-3.0
 * @link      https://gopangolin.com
 * @copyright 2017 Pangolin (Pty) Ltd
 */

namespace Pangolin\WPR;

/**
 * @subpackage Plugin
 */
class Plugin {

	/**
	 * The variable name is used as the text domain when internationalizing strings
	 * of text. Its value should match the Text Domain file header in the main
	 * plugin file.
	 *
	 * @since    1.0.0
	 *
	 * @var      string
	 */
	protected $plugin_slug = 'wpr-leads';

	/**
	 * Instance of this class.
	 *
	 * @since    1.0.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Setup instance attributes
	 *
	 * @since     1.0.0
	 */
	private function __construct() {
		$this->plugin_version = WP_REACTIVATE_VERSION;
	}

	/**
	 * Return the plugin slug.
	 *
	 * @since    1.0.0
	 *
	 * @return    Plugin slug variable.
	 */
	public function get_plugin_slug() {
		return $this->plugin_slug;
	}

	/**
	 * Return the plugin version.
	 *
	 * @since    1.0.0
	 *
	 * @return    Plugin slug variable.
	 */
	public function get_plugin_version() {
		return $this->plugin_version;
	}

	/**
	 * Fired when the plugin is activated.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		global $table_prefix, $wpdb;

		/**
		 * Create table for leads_tables if it doesnt exist.
		 */
		$wpr_leads_tables = $table_prefix . "wpr_leads_tables";
		if($wpdb->get_var( "show tables like '$wpr_leads_tables'" ) != $wpr_leads_tables) 
		{
			$sql = "CREATE TABLE `{$wpr_leads_tables}` (`id` int(11) NOT NULL auto_increment, `table_name` varchar(32) NOT NULL, PRIMARY KEY (id) ); ";
				require_once( ABSPATH . '/wp-admin/includes/upgrade.php' );
				dbDelta($sql);
		}

	}

	/**
	 * Fired when the plugin is deactivated.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {
	}


	/**
	 * Return an instance of this class.
	 *
	 * @since     1.0.0
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}
}
