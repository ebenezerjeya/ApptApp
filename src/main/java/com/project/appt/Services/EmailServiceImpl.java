package com.project.appt.Services;

import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Properties;

@Component
public class EmailServiceImpl{

    public void sendSimpleMessage(String to,String student, String subject, String text) throws MessagingException {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        //required settings
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(465);
        mailSender.setUsername("stprappointment.scheduler@gmail.com");
        mailSender.setPassword("endMySufferingIn1Day");

        //properties to get javaMail to work
        Properties mailProp = mailSender.getJavaMailProperties();
        mailProp.put("mail.transport.protocol", "smtp");
        mailProp.put("mail.smtp.auth", "true");
        mailProp.put("mail.smtp.starttls.enable", "true");
        mailProp.put("mail.smtp.starttls.required", "true");
        mailProp.put("mail.debug", "true");
        mailProp.put("mail.smtp.ssl.enable", "true");

        Session session = Session.getInstance(mailProp,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("stprappointment.scheduler@gmail.com",
                                "endMySufferingIn1Day");
                    }
                });

        // Create a default MimeMessage object.
        MimeMessage message = new MimeMessage(session);

        // Set From: header field of the header.
        message.setFrom(new InternetAddress(mailSender.getUsername()));

        // Set To: header field of the header.
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));

        message.setRecipients(Message.RecipientType.CC, InternetAddress.parse(student));

        // Set Subject: header field
        message.setSubject(subject);

        // This mail has 2 part, the BODY and the embedded image
        MimeMultipart multipart = new MimeMultipart("related");

        // first part (the html)
        BodyPart messageBodyPart = new MimeBodyPart();
        String htmlText = text + "<br><img src=\"cid:image\" height=\"100\" width=\"225\" >";
        messageBodyPart.setContent(htmlText, "text/html");
        // add it
        multipart.addBodyPart(messageBodyPart);

        // second part (the image)
        messageBodyPart = new MimeBodyPart();
        DataSource fds = new FileDataSource(
                "C:\\Users\\Ebenezer Jeya\\IdeaProjects\\SpringMVC\\src\\main\\java\\com\\project\\appt\\images\\ucm.jpg");

        messageBodyPart.setDataHandler(new DataHandler(fds));
        messageBodyPart.setHeader("Content-ID", "<image>");

        // add image to the multipart
        multipart.addBodyPart(messageBodyPart);

        // put everything together
        message.setContent(multipart);
        // Send message
        mailSender.send(message);


        System.out.println("Sent message successfully....");

    }
}