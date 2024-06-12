export function setUserInfo(data) {
	return uni.setStorageSync("userInfos", data);
}

export function getUserInfo() {
	return uni.getStorageSync("userInfos");
}

export function removeUserInfo() {
	return uni.removeStorageSync("userInfos");
}

export function setMajorInfo(data) {
	return uni.setStorageSync('MajorInfo', data)
}

export function getMajorInfo() {
	return uni.getStorageSync("MajorInfo");
}


export function setMajorInfo2(data) {
	return uni.setStorageSync('MajorInfo2', data)
}

export function getMajorInfo2() {
	return uni.getStorageSync("MajorInfo2");
}

export function setToken(data) {
	return uni.setStorageSync('token', data)
}

export function getToken() {
	return uni.getStorageSync("token");
}

export function removeToken() {
	return uni.removeStorageSync("token");
}

export function setTouristToken(data) {
	return uni.setStorageSync('touristToken', data)
}

export function getTouristToken() {
	return uni.getStorageSync("touristToken");
}

export function removeTouristToken() {
	return uni.removeStorageSync("touristToken");
}


export function setCode(data) {
	return uni.setStorageSync("code", data);
}

export function getCode() {
	return uni.getStorageSync("code");
}


export function setStudentId(data) {
	return uni.setStorageSync("studentId", data);
}

export function getStudentId() {
	return uni.getStorageSync("studentId");
}

export function setEntityId(data) {
	return uni.setStorageSync("entityId", data);
}

export function getEntityId() {
	return uni.getStorageSync("entityId");
}

export function setUpZhuvue(data) {
	return uni.setStorageSync("Zhuvue", data);
}

export function getUpZhuvue() {
	return uni.getStorageSync("Zhuvue");
}

export function setlistById(data) {
	return uni.setStorageSync("listById", data);
}

export function getlistById() {
	return uni.getStorageSync("listById");
}

export function setchapter(data) {
	return uni.setStorageSync("chapter", data);
}

export function getchapter() {
	return uni.getStorageSync("chapter");
}

export function setpaper(data) {
	return uni.setStorageSync("paper", data);
}

export function getpaper() {
	return uni.getStorageSync("paper");
}



export function setTitle(data) {
	return uni.setStorageSync("title", data);
}

export function getTitle() {
	return uni.getStorageSync("title");
}