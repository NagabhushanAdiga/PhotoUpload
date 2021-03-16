import React from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permission from "expo-permissions";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	PickfromGallery = async () => {
		const { granted } = await Permission.askAsync(Permission.CAMERA);
		if (granted) {
			let data = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				// allowsEditing: true,
				aspect: [1, 1],
				quality: 0.5,
			});
			if (!data.cancelled) {
				let newFile = {
					uri: data.uri,
					type: `test/${data.uri.split(".")[1]}`,
					name: `test.${data.uri.split(".")[1]}`,
				};
				this.UploadImage(newFile);
			}
			console.log(data);
		} else {
			Alert.alert("permission denied baby");
		}
	};
	UploadImage = async (Image) => {
		const data = new FormData();
		data.append("file", Image);
		data.append("upload_preset", "vocs5isx");
		data.append("cloud-name", "bhushanoo");

		fetch("https://api.cloudinary.com/v1_1/bhushanoo/image/upload", {
			method: "post",
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	};

	render() {
		return (
			<View style={styles.container}>
				<Button
					title="Allow Permission"
					onPress={() => {
						this.PickfromGallery();
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
