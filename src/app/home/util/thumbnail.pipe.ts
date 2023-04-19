import { Pipe, PipeTransform, inject } from "@angular/core";
import { map } from "rxjs";
import { PhotoService } from "src/app/recipe/data-access/photo.service";
import { Recipe } from "src/app/shared/util/model";

@Pipe({
    name: 'thumbnail',
    pure: true,
    standalone: true
})
export class ThumbnailPipe implements PipeTransform {

    private photos = inject(PhotoService)

    transform(recipe: Recipe) {
        return this.photos.fetchFirstPhotoByRecipeId(recipe.id)
    }
}