package com.zuoyoou.prototype;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class User {
	private int uid;
	private String name;
	private int roleId;
	private int contactInfoId;
	private int activeStatus;
	
	public int getUid() {
		return uid;
	}
	public void setUid(int uid) {
		this.uid = uid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public int getContactInfoId() {
		return contactInfoId;
	}
	public void setContactInfoId(int contactInfoId) {
		this.contactInfoId = contactInfoId;
	}
	public int getActiveStatus() {
		return activeStatus;
	}
	public void setActiveStatus(int activeStatus) {
		this.activeStatus = activeStatus;
	}
	
	
}

