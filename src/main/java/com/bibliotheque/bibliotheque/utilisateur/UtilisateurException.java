package com.bibliotheque.bibliotheque.utilisateur;

public class UtilisateurException extends Exception{
	
	private final String message;
	
	public UtilisateurException(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}

}
