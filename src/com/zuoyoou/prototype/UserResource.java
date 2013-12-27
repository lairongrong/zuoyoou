package com.zuoyoou.prototype;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/users")
public class UserResource {
	UserDAO dao = new UserDAO();
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<User> findAll() {
		System.out.println("findAll");
		return dao.findAll();
	}

	@GET @Path("search/{query}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public List<User> findByName(@PathParam("query") String query) {
		System.out.println("findByName: " + query);
		return dao.findByName(query);
	}

	@GET @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	public User findById(@PathParam("id") String id) {
		System.out.println("findById " + id);
		return dao.findById(Integer.parseInt(id));
	}
}
