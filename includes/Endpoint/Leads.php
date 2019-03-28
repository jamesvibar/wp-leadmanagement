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
 * 
 * TODO: (?P<table_name>[a-zA-Z0-9-_]+)/(?P<id>\d+) = gets table_name and ID
 */

namespace Pangolin\WPR\Endpoint;
use Pangolin\WPR;

/**
 * @subpackage REST_Controller
 */
class Leads {
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
        $endpoint = '/leads/';

        /**
         * Get all leads on a database
         * GET           /wp-json/wpr-leads/v1/leads
         */
        register_rest_route( $namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array( $this, 'get_leads' ),
                // 'permission_callback'   => array( $this, 'admin_permissions_check' ),
                'args'                  => array(
                    'table_name' => [
                        'required' => 'true'
                    ]
                ),
            ),
        ) );

        /**
         * Get single lead
         * GET           /wp-json/wpr-leads/v1/leads/:id
         */
        register_rest_route( $namespace, $endpoint . '(?P<id>\d+)', array(
            array(
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => array( $this, 'get_lead' ),
                // 'permission_callback'   => array( $this, 'admin_permissions_check' ),
                'args'                  => array(
                    'id' => [
                        'required' => 'true'
                    ]
                ),
            ),
        ) );

        /**
         * Update single lead
         * GET           /wp-json/wpr-leads/v1/leads/:id
         */
        register_rest_route( $namespace, $endpoint . '(?P<id>\d+)', array(
            array(
                'methods'               => \WP_REST_Server::EDITABLE,
                'callback'              => array( $this, 'update_lead' ),
                // 'permission_callback'   => array( $this, 'admin_permissions_check' ),
                'args'                  => array(
                    'id' => [
                        'required' => 'true'
                    ],
                    'name' => array(
                        'required' => true,
                        'type' => 'string',
                        'description' => 'The client\'s  name',
                        'validate_callback' => function( $param, $request, $key ) { return !empty($param); }
                    ),
                    'email' => array(
                        'required' => true,
                        'type' => 'string',
                        'description' => 'The client\'s  email address',
                        'format' => 'email',
                        'validate_callback' => function( $param, $request, $key ) { return !empty($param); }
                    ),
                    'phone' => array(
                        'required' => true,
                        'description' => 'The client\'s  phone',
                    ),
                    'message' => array(
                        'required' => true,
                        'type' => 'string',
                        'description' => 'The client\'s  message',
                        'validate_callback' => function( $param, $request, $key ) { return !empty($param); }
                    ),
                    'date_send' => array(
                        'required' => true,
                        'type' => 'date',
                        'description' => 'The client\'s  date sent',
                        'validate_callback' => function( $param, $request, $key ) { return !empty($param); }
                    ),
                    'source' => array(
                        'required' => false,
                        'type' => 'string',
                        'description' => 'Form origin',
                    ),
                    'form_type' => array(
                        'required' => false,
                        'type' => 'string',
                        'description' => 'Form type',
                    ),
                    'form_type_id' => array(
                        'required' => false,
                        'description' => 'Form type ID',
                    ),
                    'lead_source' => array(
                        'required' => false,
                        'type' => 'string',
                        'description' => 'Form lead source',
                    ),
                    'has_been_contacted' => array(
                        'required' => false,
                        'description' => 'Form bool',
                    ),
                    'is_deleted' => array(
                        'required' => false,
                        'type' => 'integer',
                        'description' => 'Form deleted',
                    ),
                    'manual_add' => array(
                        'required' => false,
                        'type' => 'integer',
                        'description' => 'Form manually added?',
                    ),
                    
                ),
            ),
        ) );

        /**
         * Create a lead
         * GET           /wp-json/wpr-leads/v1/leads/:id
         */
        register_rest_route( $namespace, $endpoint, array(
            array(
                'methods'               => \WP_REST_Server::CREATABLE,
                'callback'              => array( $this, 'add_lead' ),
                'args'                  => array( //Expected parameters for this request
                    'name' => array(
                        'required' => true,
                        'type' => 'string',
                        'description' => 'The client\'s  name',
                        'validate_callback' => function( $param, $request, $key ) { return !empty($param); }
                    ),
                    'email' => array(
                        'required' => true,
                        'type' => 'string',
                        'description' => 'The client\'s  email address',
                        'format' => 'email',
                        'validate_callback' => function( $param, $request, $key ) { return !empty($param); }
                    ),
                    'phone' => array(
                        'required' => true,
                        'description' => 'The client\'s  phone',
                    ),
                    'message' => array(
                        'required' => true,
                        'type' => 'string',
                        'description' => 'The client\'s  message',
                        'validate_callback' => function( $param, $request, $key ) { return !empty($param); }
                    ),
                    'date_send' => array(
                        'required' => true,
                        'type' => 'date',
                        'description' => 'The client\'s  date sent',
                        'validate_callback' => function( $param, $request, $key ) { return !empty($param); }
                    ),
                    'source' => array(
                        'required' => false,
                        'type' => 'string',
                        'description' => 'Form origin',
                    ),
                    'form_type' => array(
                        'required' => false,
                        'type' => 'string',
                        'description' => 'Form type',
                    ),
                    'form_type_id' => array(
                        'required' => false,
                        'description' => 'Form type ID',
                    ),
                    'lead_source' => array(
                        'required' => false,
                        'type' => 'string',
                        'description' => 'Form lead source',
                    ),
                    'has_been_contacted' => array(
                        'required' => false,
                        'description' => 'Form bool',
                    ),
                    'is_deleted' => array(
                        'required' => false,
                        'type' => 'integer',
                        'description' => 'Form deleted',
                    ),
                    'manual_add' => array(
                        'required' => false,
                        'type' => 'integer',
                        'description' => 'Form manually added?',
                    ),
                ),
            ),
        ) );

        /**
         * Delete a lead (not really a delete lol)
         * DELETE           /wp-json/wpr-leads/v1/leads/:id
         */
        register_rest_route( $namespace, $endpoint . '(?P<id>\d+)', array(
            array(
                'methods'               => \WP_REST_Server::DELETABLE,
                'callback'              => array( $this, 'delete_lead' ),
                'args'                  => array(),
            ),
        ) );

    }

    /**
     * Get All Leads
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_leads( $request ) {
        global $wpdb;

        $query = "SELECT * FROM `wp_database_emails` order by `date_send` desc";
        $list = $wpdb->get_results($query);

        if (! $list ) {
          return new \WP_REST_Response( ["message" => "No leads found"], 404 );
        }

        return new \WP_REST_Response( $list, 200 );
    }

    /**
     * Get Single lead
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function get_lead( $request ) {
        global $wpdb;

        $id = $request->get_param('id');
        $query = "SELECT * FROM `wp_database_emails` WHERE id={$id}";
        $list = $wpdb->get_results($query);

        if (! $list ) {
            return new \WP_REST_Response( ["message" => "No lead found"], 404 );
          }
        
        return new \WP_REST_Response( $list[0], 200 );
    }

    /**
     * Update lead
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function update_lead( $request ) {
        global $wpdb;
        
        $id = esc_sql($request->get_param('id'));
        $name = esc_sql($request->get_param('name'));
        $email = esc_sql($request->get_param('email'));
        $phone = esc_sql($request->get_param('phone'));
        $message = $request->get_param('message');
        $date_send = esc_sql($request->get_param('date_send'));
        $source = esc_sql($request->get_param('source'));
        $form_type = esc_sql($request->get_param('form_type'));
        $form_type_id = esc_sql($request->get_param('form_type_id'));
        $lead_source = esc_sql($request->get_param('lead_source'));
        $has_been_contacted = esc_sql($request->get_param('has_been_contacted'));
        $profit = esc_sql($request->get_param('profit'));
        $last_edit = esc_sql($request->get_param('last_edit'));
        $manual_add = esc_sql($request->get_param('manual_add'));

        $updated = $wpdb->query( $wpdb->prepare(
            "UPDATE `wp_database_emails`
            SET name = %s, email = %s, phone = %d, message = %s, date_send = %s, source = %s, form_type = %s, form_type_id = %s, lead_source = %s, has_been_contacted = %d, profit = %d, last_edit = %s, manual_add = %d
            WHERE id = %d",
            $name,
            $email,
            $phone,
            $message,
            $date_send,
            $source,
            $form_type,
            $form_type_id,
            $lead_source,
            $has_been_contacted,
            $profit,
            $last_edit,
            $manual_add,
            $id
        ) );

        if(!$updated) {
            return new \WP_REST_Response( array(
                'message'   => "Update lead failed.",
            ), 404 );
        }

        return new \WP_REST_Response( array(
            'id' => $id,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'message' => $message,
            'date_send' => $date_send,
            'source' => $source,
            'form_type' => $form_type,
            'form_type_id' => $form_type_id,
            'lead_source' => $lead_source,
            'has_been_contacted' => $has_been_contacted,
            'profit' => $profit,
            'last_edit' => $last_edit,
            'manual_add' => $manual_add,
        ), 200 );
    }

    public function add_lead( $request ) {
        global $wpdb;
        
        $name = esc_sql($request->get_param('name'));
        $email = esc_sql($request->get_param('email'));
        $phone = esc_sql($request->get_param('phone'));
        $message = $request->get_param('message');
        $date_send = esc_sql($request->get_param('date_send'));
        $source = esc_sql($request->get_param('source'));
        $form_type = esc_sql($request->get_param('form_type'));
        $form_type_id = esc_sql($request->get_param('form_type_id'));
        $lead_source = esc_sql($request->get_param('lead_source'));
        $has_been_contacted = esc_sql($request->get_param('has_been_contacted'));
        $profit = esc_sql($request->get_param('profit'));
        $manual_add = esc_sql($request->get_param('manual_add'));

        $inserted = $wpdb->insert("wp_database_emails", array(
            "name" => $name,
            "email" => $email,
            "phone" => $phone,
            "message" => $message,
            "date_send" => $date_send,
            "source" => $source,
            "form_type" => $form_type,
            "form_type_id" => $form_type_id,
            "lead_source" => $lead_source,
            "has_been_contacted" => $has_been_contacted,
            "profit" => $profit,
            // "last_edit" => $last_edit,
            // "is_deleted" => $is_deleted,
            "manual_add" => 1
        ), array(
            '%s', '%s', '%d', '%s', '%s', '%s', '%s', '%d', '%s', '%d', '%d', '%d'
        ));

        if(!$inserted) {
            return new \WP_REST_Response( array(
                'message'   => 'Error in creating lead',
            ), 404 );
        }

        return new \WP_REST_Response( array(
            'id' => strval($wpdb->insert_id),
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'message' => $message,
            'date_send' => $date_send,
            'source' => $source,
            'form_type' => $form_type,
            'form_type_id' => $form_type_id,
            'lead_source' => $lead_source,
            'has_been_contacted' => $has_been_contacted,
            'profit' => $profit,
            "manual_add" => $manual_add
        ), 200 );
    }

    /**
     * Delete Single lead
     *
     * @param WP_REST_Request $request Full data about the request.
     * @return WP_Error|WP_REST_Request
     */
    public function delete_lead( $request ) {
        global $wpdb;

        $id = $request->get_param('id');
        // Update the is_deleted boolean value from the database to prevent it from appearing.
        // $query = "UPDATE `wp_database_emails` SET is_deleted=1 WHERE id=2551";
        $deleted = $wpdb->update(
            'wp_database_emails',           // TABLE_NAME
            array( 'is_deleted' => 1 ),     // VALUES
            array( 'id' => $id),           // WHERE
            array( '%d' ),                  // VALUE FORMAT %d = integer
            array( '%d' )                   // WHERE VALUE FORMAT %d = integer  
        );

        if (!$deleted ) {
            return new \WP_REST_Response( ["message" => "Unable to delete lead"], 404 );
        }
        
        return new \WP_REST_Response( ["id" => $id], 200 );
    }

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
