package com.project.appt.Controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

public class SessionController {

    @Controller
    @SessionAttributes("studentID")
    public class SessionAttributeController {

        @RequestMapping(value = "/login")
        public ModelAndView showLogin() {
            return new ModelAndView("login");
        }

        @RequestMapping(value = "/home", method = RequestMethod.POST)
        public ModelAndView showHome(@RequestParam String id) {

            ModelAndView mv = new ModelAndView("welcome");
            mv.addObject("studentID", id);

            return mv;

        }
    }
}