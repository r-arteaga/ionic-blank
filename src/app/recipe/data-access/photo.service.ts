import { Injectable } from "@angular/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { BehaviorSubject, map } from 'rxjs'
import { defaultThumb } from "./default-thumbnail";

const PHOTO_DIR_KEY: string = 'photos'

export interface LocalPhoto {
    name: string
    base64: string
}

@Injectable({
    providedIn: 'root'
})
export class PhotoService {

    private recipePhotos = new BehaviorSubject<LocalPhoto[]>([])
    recipePhotos$ = this.recipePhotos.asObservable()

    private async checkDir(recipeId: string) {
        try {
            await Filesystem.readdir({
                directory: Directory.Data,
                path: `${PHOTO_DIR_KEY}/${recipeId}`
            })
        } catch (error) {
            try {
                await Filesystem.mkdir({
                    directory: Directory.Data,
                    path: PHOTO_DIR_KEY
                })
            } catch (error) {
                // already exists
            }
            await Filesystem.mkdir({
                directory: Directory.Data,
                path: `${PHOTO_DIR_KEY}/${recipeId}`
            })
        }
    }

    async loadPhotos(recipeId: string) {
        await this.checkDir(recipeId)

        const dir = await Filesystem.readdir({
            directory: Directory.Data,
            path: `${PHOTO_DIR_KEY}/${recipeId}`
        })

        const photos: LocalPhoto[] = []
 
        for (const fileInfo of dir.files) {
            const fileName: string = fileInfo.name
            const fileResult = await Filesystem.readFile({
                directory: Directory.Data,
                path: `${PHOTO_DIR_KEY}/${recipeId}/${fileName}`,
            })
            photos.push({
                name: fileName,
                base64: `data:image/jpeg;base64,${fileResult.data}`
            })
        }
        
        this.recipePhotos.next(photos)
    }

    async getPhoto(recipeId: string, fileName: string) {
        return await Filesystem.getUri({
            directory: Directory.Data,
            path: `${PHOTO_DIR_KEY}/${recipeId}/${fileName}`,
        })
    }

    async addRecipePhoto(recipeId: string, dataUrl: string) {
        await Filesystem.writeFile({
            directory: Directory.Data,
            path: `${PHOTO_DIR_KEY}/${recipeId}/${new Date().getTime()}.png`,
            data: dataUrl
        })

        this.loadPhotos(recipeId)
    }

    async deleteRecipePhoto(recipeId: string, photo: LocalPhoto) {
        await Filesystem.deleteFile({
            directory: Directory.Data,
            path: `${PHOTO_DIR_KEY}/${recipeId}/${photo.name}`
        })

        this.loadPhotos(recipeId)
    }

    async fetchFirstPhotoByRecipeId(recipeId: string): Promise<string | undefined> {
        await this.checkDir(recipeId)

        const dir = await Filesystem.readdir({
            directory: Directory.Data,
            path: `${PHOTO_DIR_KEY}/${recipeId}`
        })

        if(dir.files.length > 0) {
            console.log(recipeId)
            const fileResult = await Filesystem.readFile({
                directory: Directory.Data,
                path: `${PHOTO_DIR_KEY}/${recipeId}/${dir.files[0].name}`,
            }) 
            return `data:image/jpeg;base64,${fileResult.data}`
        }

        return `data:image/jpeg;base64,${defaultThumb}`
    }

}