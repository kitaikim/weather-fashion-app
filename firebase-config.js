// Firebase 설정 및 초기화
const firebaseConfig = {
    apiKey: "AIzaSyAICX1jkyWUQuBqlLOCIObBwdywlSgqpDw",
    authDomain: "weather-fashion-app-e6c65.firebaseapp.com",
    projectId: "weather-fashion-app-e6c65",
    storageBucket: "weather-fashion-app-e6c65.firebasestorage.app",
    messagingSenderId: "819826886916",
    appId: "1:819826886916:web:a1b856f5b4e0b81cb26851",
    measurementId: "G-RTF8G13XGX"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const firebaseDB = firebase.firestore();
const firebaseStorage = firebase.storage();

// ===== Firestore 데이터베이스 함수들 =====

// 착샷 저장
async function saveOutfitToFirestore(outfit) {
    try {
        await firebaseDB.collection('outfits').doc(outfit.id.toString()).set(outfit);
        console.log('✅ Firestore에 저장됨:', outfit.id);
        return outfit.id;
    } catch (error) {
        console.error('❌ Firestore 저장 오류:', error);
        throw error;
    }
}

// 모든 착샷 가져오기
async function getAllOutfitsFromFirestore() {
    try {
        const snapshot = await firebaseDB.collection('outfits').get();
        const outfits = [];
        snapshot.forEach(doc => {
            outfits.push(doc.data());
        });
        console.log(`✅ Firestore에서 ${outfits.length}개 착샷 로드됨`);
        return outfits;
    } catch (error) {
        console.error('❌ Firestore 읽기 오류:', error);
        return [];
    }
}

// 특정 착샷 가져오기
async function getOutfitFromFirestore(id) {
    try {
        const doc = await firebaseDB.collection('outfits').doc(id.toString()).get();
        if (doc.exists) {
            return doc.data();
        }
        console.warn('⚠️ 착샷을 찾을 수 없음:', id);
        return null;
    } catch (error) {
        console.error('❌ Firestore 읽기 오류:', error);
        return null;
    }
}

// 착샷 업데이트
async function updateOutfitInFirestore(outfit) {
    try {
        await firebaseDB.collection('outfits').doc(outfit.id.toString()).set(outfit);
        console.log('✅ Firestore 업데이트됨:', outfit.id);
        return outfit.id;
    } catch (error) {
        console.error('❌ Firestore 업데이트 오류:', error);
        throw error;
    }
}

// 착샷 삭제
async function deleteOutfitFromFirestore(id) {
    try {
        await firebaseDB.collection('outfits').doc(id.toString()).delete();
        console.log('✅ Firestore에서 삭제됨:', id);
    } catch (error) {
        console.error('❌ Firestore 삭제 오류:', error);
        throw error;
    }
}

// ===== Firebase Storage 이미지 함수들 =====

// 이미지 업로드 (Base64 → Firebase Storage)
async function uploadImageToStorage(imageData, outfitId) {
    try {
        // Base64 데이터인 경우에만 Storage에 업로드 시도
        if (imageData.startsWith('data:image')) {
            console.log('📤 Base64 이미지를 Storage에 업로드 시도 중...');
            const storageRef = firebaseStorage.ref(`outfits/${outfitId}.jpg`);
            await storageRef.putString(imageData, 'data_url');
            const downloadURL = await storageRef.getDownloadURL();
            console.log('✅ 이미지 업로드 성공:', downloadURL);
            return downloadURL;
        }

        // 이미 URL인 경우 (http:// 또는 https://로 시작)
        if (imageData.startsWith('http://') || imageData.startsWith('https://')) {
            console.log('🔗 이미지 URL 그대로 사용:', imageData);
            return imageData;
        }

        // 그 외의 경우
        console.warn('⚠️ 알 수 없는 이미지 데이터 형식:', imageData.substring(0, 50));
        return imageData;
    } catch (error) {
        console.error('❌ 이미지 Storage 업로드 오류:', error);
        console.log('⚠️ 업로드 실패, 원본 데이터 사용');
        // 업로드 실패 시 원본 데이터 그대로 반환 (Base64 또는 URL)
        return imageData;
    }
}

// 이미지 삭제
async function deleteImageFromStorage(outfitId) {
    try {
        const storageRef = firebaseStorage.ref(`outfits/${outfitId}.jpg`);
        await storageRef.delete();
        console.log('✅ 이미지 삭제됨:', outfitId);
    } catch (error) {
        // 파일이 없으면 무시
        if (error.code !== 'storage/object-not-found') {
            console.error('❌ 이미지 삭제 오류:', error);
        }
    }
}

console.log('🔥 Firebase 초기화 완료');
