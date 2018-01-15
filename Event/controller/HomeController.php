<?php

require_once WWW_ROOT . 'controller'. DS .'AppController.php';

class HomeController extends AppController{


	public function __construct(){

		//require_once WWW_ROOT . 'dao' .DS. 'PlacesDAO.php';
		//require_once WWW_ROOT . 'dao' .DS. 'CategoryDAO.php';

		//$this->placesDAO = new PlacesDAO();
		//$this->categoryDAO = new CategoryDAO();
		if(isset($_POST["email"])){

			$email = $_POST["email"];

			if(filter_var($email, FILTER_VALIDATE_EMAIL)) {
					$result = $this->addEmail($email);
			    print_r($result);
			}
		}

	}

	public function home(){

	}

	public function detail(){

	}

	private function addEmail($email){

		/*$data = array("api" => "pk_3e62f11d570d1da469d341584c8922b86a", "email" => $email,"properties" => NULL ,"confirm_optin" => true);
		$data_string = json_encode($data);

		$ch = curl_init('https://a.klaviyo.com/api/v1/list/Qnytnh/members');
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		    'Content-Type: application/json',
		    'Content-Length: ' . strlen($data_string))
		);*/
		$data = array("email" => $email);
		$data_string = json_encode($data);

		$form_id="Qnytnh";
		$mail_api_key="pk_3e62f11d570d1da469d341584c8922b86a";

		$ch = curl_init("https://a.klaviyo.com/api/v1/list/$form_id/members?api_key=$mail_api_key");

		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		        'Content-Type: application/json'
		    ));


		return $result = curl_exec($ch);

	}
}
