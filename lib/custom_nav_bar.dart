import 'package:flutter/material.dart';
import 'package:koalytics_biometric_usability_testing/about_app.dart';
import 'package:koalytics_biometric_usability_testing/researchers/project_history.dart';
import 'package:koalytics_biometric_usability_testing/researchers/researcher_dashboard.dart';
import 'package:koalytics_biometric_usability_testing/researchers/researcher_profile.dart';
import 'package:salomon_bottom_bar/salomon_bottom_bar.dart';


class CustomNavBar extends StatefulWidget {
  const CustomNavBar({super.key});

  @override
  _CustomNavBarState createState() => _CustomNavBarState();
}

class _CustomNavBarState extends State<CustomNavBar> {
  int _currentIndex = 0;

  static List<Widget> _widgetOptions = <Widget>[
    ResearcherDashboard(),
    ProjectHistoryScreen(),
    AboutAppScreen(),
    ResearcherProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor:Color.fromARGB(255, 90, 121, 201),
      body: _widgetOptions.elementAt(_currentIndex),
      bottomNavigationBar: SalomonBottomBar(
        currentIndex: _currentIndex,
        onTap: (i) => setState(() => _currentIndex = i),
        items: [
          SalomonBottomBarItem(
            icon: Icon(Icons.dashboard),
            title: Text(
              "Main Dashboard",
              style: TextStyle(
                fontFamily: "Tommy",
              )
            ),
            selectedColor: const Color.fromARGB(255, 255, 255, 255),
          ),
          SalomonBottomBarItem(
            icon: Icon(Icons.work_history),
            title: Text(
              "Project History",
              style: TextStyle(
                fontFamily: "Tommy",
              )
            ),
            selectedColor: const Color.fromARGB(255, 255, 255, 255),
          ),
          SalomonBottomBarItem(
            icon: Icon(Icons.info),
            title: Text(
              "About App",
              style: TextStyle(
                fontFamily: "Tommy",
              )
            ),
            selectedColor: const Color.fromARGB(255, 255, 255, 255),
          ),
          SalomonBottomBarItem(
            icon: Icon(Icons.person_2),
            title: Text(
              "Profile",
              style: TextStyle(
                fontFamily: "Tommy",
              )
            ),
            selectedColor: const Color.fromARGB(255, 255, 255, 255),
          ),
        ],
      ),
    );
  }
}
