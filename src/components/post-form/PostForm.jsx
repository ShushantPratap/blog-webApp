import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, SelectOpt } from "../Index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {cacheStorePosts, deleteCachePost} from "../../store/postSlice"

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
    
    const createdTime = new Date(post?.$createdAt);
    const updatedTime = new Date(post?.$updatedAt);
    const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            });
            if (dbPost) {
                dispatch(deleteCachePost(post.$id));
                dispatch(cacheStorePosts(dbPost));
                navigate(`/all-posts/${dbPost.$id}`);
            }
        } else {
            if(data.title){
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id
                    });
                    
                    if (dbPost) {
                        dispatch(cacheStorePosts(dbPost));
                        navigate(`/all-posts/${dbPost.$id}`);
                    }
                }
            }
        }
    };

    const slugTransform = useCallback(value => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\d\s]+/g, '-')
                .replace(/\s/g, '-');
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                const slug = slugTransform(value.title);
                setValue('slug', slug, { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue, slugTransform]);

    return (
        <form className="post-form" onSubmit={handleSubmit(submit)}>
            <div className="upload-img">
                <Button type="submit">
                    {post ? "Update Post" : "Create Post"}
                </Button>
                <Input
                label="Featured Image"
                type="file"
                accept="image/*"
                {...register("image", { required: !post })}
                />
                <SelectOpt
                    label="Status"
                    options={["active", "inactive"]}
                    {...register("status", { required: true })}
                />
            </div>
            {post && (
                <div className="image-details row">
                    <img
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        height="133px"
                    />
                    <table border="1" cellSpacing="0">
                        <tbody>
                            <tr>
                                <th>Created At</th>
                                <td>{`${Days[createdTime.getDay()-1]} | ${createdTime.toLocaleString()}`}</td>
                            </tr>
                            <tr>
                                <th>Last Update</th>
                                <td>{`${Days[updatedTime.getDay()-1]} | ${updatedTime.toLocaleString()}`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <div className="RTE-title">
                <Input
                    label="Title :"
                    placeholder="Enter post title"
                    {...register("title", { required: true })}
                    />
                <Input
                    label="Slug :"
                    placeholder="post slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
            </div>
            <div className="RTE">
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
        </form>
    );
}

export default PostForm;