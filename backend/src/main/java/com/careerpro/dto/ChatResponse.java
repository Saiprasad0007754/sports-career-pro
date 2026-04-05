package com.careerpro.dto;

public class ChatResponse {
    private String reply;
    private boolean success;

    public ChatResponse(String reply, boolean success) {
        this.reply = reply;
        this.success = success;
    }

    public String getReply() { return reply; }
    public boolean isSuccess() { return success; }
}
