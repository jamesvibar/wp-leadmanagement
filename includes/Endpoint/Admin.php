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

namespace Pangolin\WPR\Endpoint;
use Pangolin\WPR;

/**
 * @subpackage REST_Controller
 */
class Admin {
    /**
	 * Instance of this class.
	 *
	 * @since    0.8.1
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the plugin by setting localization and loading public scripts
	 * and styles.
	 *
	 * @since     0.8.1
	 */
	private function __construct() {
        $plugin = WPR\Plugin::get_instance();
		$this->plugin_slug = $plugin->get_plugin_slug();
	}

    /**
     * Set up WordPress hooks and filters
     *
     * @return void
     */
    public function do_hooks() {
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    }

	/**
	 * Return an instance of this class.
	 *
	 * @since     0.8.1
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
			self::$instance->do_hooks();
		}

		return self::$instance;
	}

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes() {
        $version = '1';
        $namespace = $this->plugin_slug . '/v' . $version;
        $endpoint = '/admin/';

        /**
         * Endpoint for all lead_tables
         */
        register_rest_route( $namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array( $this, 'get_tables' ),
                // 'permission_callback'   => array( $this, 'admin_permissions_check' ),
                'args'                  => array(),
            ),
        ) );

        /**
         * Endpoint for adding a lead_tables
         */
        register_rest_route( $namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array( $this, 'add_table' ),
                // 'permission_callback'   => array( $this, 'admin_permissions_check' ),
                'args'                  => array(
                    'table_name' => [
                        'required' => true,
                        'type' => 'string',
                        'validate_callback' => function( $param, $request, $key ) { return !empty($param); }
                    ]
                ),
            ),
        ) );


    }

    /**
     * Get all Tables
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_tables( $request ) {
        global $wpdb;

        $query = "SELECT * FROM `wp_wpr_leads_tables`";
        $list = $wpdb->get_results($query);

        if (! $list ) {
          return new \WP_REST_Response( ["message" => "No tables found"], 404 );
        }

        return new \WP_REST_Response( $list, 200 );
    }

    public function add_table( $request ) {
        global $wpdb;

        $table_name = esc_sql($request->get_param('table_name'));

        $inserted = $wpdb->query( $wpdb->prepare(
            "INSERT INTO `wp_wpr_leads_tables` (table_name) VALUES (%s)", $table_name
        ) );

        if (! $inserted ) {
          return new \WP_REST_Response( ["message" => "Cannot add table"], 404 );
        }

        return new \WP_REST_Response( $inserted, 200 );
    }

    // /**
    //  * Create OR Update Example
    //  *
    //  * @param WP_REST_Request $request Full data about the request. //askdnsakldnk
    //  * @return WP_Error|WP_REST_Request
    //  */
    // public function update_author_email( $request ) {
    //     $updated = update_option( 'wpr_author_email', $request->get_param( 'email' ) );

    //     return new \WP_REST_Response( array(
    //         'success'   => $updated,
    //         'value'     => $request->get_param( 'email' )
    //     ), 200 );
    // }

    // /**
    //  * Delete Example
    //  *
    //  * @param WP_REST_Request $request Full data about the request.
    //  * @return WP_Error|WP_REST_Request
    //  */
    // public function delete_author_email( $request ) {
    //     $deleted = delete_option( 'wpr_author_email' );

    //     return new \WP_REST_Response( array(
    //         'success'   => $deleted,
    //         'value'     => ''
    //     ), 200 );
    // }

    /**
     * Check if a given request has access to update a setting
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|bool
     */
    public function admin_permissions_check( $request ) {
        return current_user_can( 'manage_options' );
    }
}
