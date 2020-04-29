require "selenium-webdriver"
require "rspec"

describe "flow" do
  driver = Selenium::WebDriver.for :firefox
  describe "Login Process" do
    it "logs in using the username and password" do
      driver.navigate.to "http://localhost:3000/login"

      user_id = driver.find_element(id: "id")
      user_id.send_keys "700333333"

      password = driver.find_element(id: "password")
      password.send_keys "Noooooo2"
      password.submit
    end
  end

  describe "Make Appointment" do
    it "makes a new appointment" do
      new_appt = driver.find_element(id: "apptButton").click

      driver.switch_to.window(driver.window_handles[-1])

      purpose = driver.find_element(id: "purposeBox").click

      selectReason = driver.find_element(id: "react-select-3-option-0").click

      selectProfBox = driver.find_element(id: "selectProf").click

      selectProf = driver.find_element(id: "react-select-5-option-3").click

      selectCourseBox = driver.find_element(id: "courseList").click

      selectCourse = driver.find_element(id: "react-select-7-option-0").click

      selectCampusBox= driver.find_element(id: "campusList").click

      selectCampus = driver.find_element(id: "react-select-9-option-0").click

      additionalText = driver.find_element(id: "description")
      additionalText.send_keys("Selenium test using Ruby made by Ebenezer Jeya")

      continue = driver.find_element(id: "cont")
      continue.click

      selectDate = driver.find_element(id: "datepicker")
      #selectDate.click
      selectDate.send_keys "2020-05-07"

      selectTime = driver.find_element(id: "times").click

      pickTime = driver.find_element(id: "react-select-11-option-0").click

      submitAppt = driver.find_element(id: "submitAppt").click

      confirm = driver.find_element(id: "confirm").click




        #driver.quit
    end
  end
end