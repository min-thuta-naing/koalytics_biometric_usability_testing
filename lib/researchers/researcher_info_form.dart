import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:koalytics_biometric_usability_testing/researchers/researcher_dashboard.dart';

class ResearcherInfoForm extends StatefulWidget{
  const ResearcherInfoForm({super.key});

  @override
  _ResearcherInfoForm createState() => _ResearcherInfoForm();
}


class _ResearcherInfoForm extends State<ResearcherInfoForm> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _orgController = TextEditingController();
  final TextEditingController _deptController = TextEditingController();
  final TextEditingController _jobTitleController = TextEditingController();
  String? _selectedCountry; // Holds the selected country
  final TextEditingController _aboutYouController = TextEditingController();

  // List of countries (add more if needed)
  final List<String> _countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czechia (Czech Republic)', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini (Swaziland)', 'Ethiopia', 'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
    'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
    'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
    'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
    'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
    'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
    'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
    'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania',
    'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda',
    'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
    'Yemen', 'Zambia', 'Zimbabwe'
  ];


  File? _image; // Stores the selected image
  final ImagePicker _picker = ImagePicker();


  // Function to pick image
  Future<void> _pickImage(ImageSource source) async {
    final XFile? pickedFile = await _picker.pickImage(source: source);

    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path); // Convert XFile to File
      });
    }
  }

  // Show option dialog (Camera / Gallery)
  void _showImagePicker() {
    showModalBottomSheet(
      context: context,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(15)),
      ),
      builder: (context) {
        return Wrap(
          children: [
            ListTile(
              leading: Icon(Icons.camera_alt),
              title: Text('Take a Photo'),
              onTap: () {
                Navigator.pop(context);
                _pickImage(ImageSource.camera);
              },
            ),
            ListTile(
              leading: Icon(Icons.image),
              title: Text('Choose from Gallery'),
              onTap: () {
                Navigator.pop(context);
                _pickImage(ImageSource.gallery);
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      //app bar 
      appBar: AppBar(
        title: const Text(
          'Sign Up as Researcher',
          style: TextStyle(
            fontSize: 18,
            fontFamily: "Tommy",
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Color.fromARGB(255, 117, 232, 151), // Customize app bar color
      ),


      body: SingleChildScrollView( 
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [

                // Profile Picture Picker
                GestureDetector(
                  onTap: _showImagePicker,
                  child: CircleAvatar(
                    radius: 60,
                    backgroundColor: Colors.grey[300],
                    backgroundImage: _image != null ? FileImage(_image!) : null,
                    child: _image == null
                        ? Icon(Icons.add_a_photo, size: 40, color: Colors.white)
                        : null,
                  ),
                ),
                const SizedBox(height: 20),


                // Organization or institution Field
                TextFormField(
                  controller: _orgController,
                  decoration: const InputDecoration(
                    labelText: 'Organization/ Institution',
                    border: OutlineInputBorder(),
                    labelStyle: TextStyle(
                      fontFamily: 'Tommy',
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your organization';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 15),


                // Department Field
                TextFormField(
                  controller: _deptController,
                  decoration: const InputDecoration(
                    labelText: 'Department',
                    border: OutlineInputBorder(),
                    labelStyle: TextStyle(
                      fontFamily: 'Tommy',
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  keyboardType: TextInputType.emailAddress,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your department';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 15),


                // Job Title Field
                TextFormField(
                  controller: _jobTitleController,
                  decoration: const InputDecoration(
                    labelText: 'Job Title',
                    border: OutlineInputBorder(),
                    labelStyle: TextStyle(
                      fontFamily: 'Tommy',
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your job title';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 15),

                // Country Dropdown Field
                DropdownButtonFormField<String>(
                  decoration: const InputDecoration(
                    labelText: 'Select Country',
                    border: OutlineInputBorder(),
                  ),
                  value: _selectedCountry,
                  items: _countries.map((String country) {
                    return DropdownMenuItem<String>(
                      value: country,
                      child: Text(country),
                    );
                  }).toList(),
                  menuMaxHeight: 300,
                  onChanged: (String? newValue) {
                    _selectedCountry = newValue; // Updates selected country
                  },
                  validator: (value) => value == null ? 'Please select your country' : null,
                ),
                const SizedBox(height: 20),

                // More About You Field
                TextFormField(
                  controller: _aboutYouController,
                  decoration: const InputDecoration(
                    labelText: 'More About You',
                    border: OutlineInputBorder(),
                    labelStyle: TextStyle(
                      fontFamily: 'Tommy',
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                    alignLabelWithHint: true, // Aligns label with multiple lines
                  ),
                  maxLines: 5, // Allows multiple lines (set to null for unlimited)
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please tell us about yourself';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),

                // Sign Up Button with Sliding Transition
                ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      _navigateToResearcherDashboard();
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(255, 117, 232, 151),
                    foregroundColor: Colors.black,
                    shadowColor: Color.fromARGB(255, 57, 114, 74),
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4),
                    ),
                    minimumSize: Size(200, 50),
                  ),
                  child: const Text(
                    'Go',
                    style: TextStyle(
                      fontSize: 18,
                      fontFamily: "Tommy",
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }


 void _navigateToResearcherDashboard() {
    Navigator.push(
      context,
      PageRouteBuilder(
        transitionDuration: const Duration(milliseconds: 300),
        pageBuilder: (context, animation, secondaryAnimation) => const ResearcherDashboard(), // Now directly linked
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          const begin = Offset(1.0, 0.0);
          const end = Offset.zero;
          const curve = Curves.easeInOut;


          var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
          var offsetAnimation = animation.drive(tween);


          return SlideTransition(
            position: offsetAnimation,
            child: child,
          );
        },
      ),
    );
  }
}
